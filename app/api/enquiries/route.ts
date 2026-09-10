import { NextResponse } from 'next/server';

import { Resend } from 'resend';
import { z } from 'zod';

import { rateLimit } from '@/lib/rate-limit';
import { createAdminClient } from '@/lib/supabase/admin';

const enquirySchema = z.object({
  website: z.string().max(0).optional(),

  name: z.string().trim().min(2, 'Please enter your name.').max(100, 'Name is too long.'),

  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(150, 'Email is too long.'),

  phone: z.string().trim().max(30, 'Phone number is too long.').optional().or(z.literal('')),

  service: z
    .array(z.enum(['Photography', 'Cinematography']))
    .min(1, 'Please select at least one service.')
    .max(2, 'Please select a valid service.'),

  projectDate: z.string().optional().or(z.literal('')),

  projectSizeSqft: z
    .string()
    .trim()
    .refine((value) => {
      if (!value) {
        return true;
      }

      const size = Number(value);

      return Number.isFinite(size) && size > 0 && size <= 1000000;
    }, 'Please enter a valid project size.')
    .optional()
    .or(z.literal('')),

  location: z.string().trim().max(150, 'Location is too long.').optional().or(z.literal('')),

  budget: z.string().trim().max(100, 'Budget is too long.').optional().or(z.literal('')),

  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more about your project.')
    .max(3000, 'Message is too long.'),
});

export async function POST(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const identifier = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';

  const limit = rateLimit(identifier);

  if (!limit.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'Too many enquiries from this connection. Please try again later.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(limit.retryAfter),
        },
      },
    );
  }

  try {
    const body = await request.json();
    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      console.error('Enquiry validation error:', errors);

      const firstError = Object.values(errors)
        .flat()
        .find((error): error is string => Boolean(error));

      return NextResponse.json(
        {
          success: false,
          message: firstError || 'Please check the information you entered.',
          errors,
        },
        { status: 400 },
      );
    }

    const {
      website,
      name,
      email,
      phone,
      service,
      projectDate,
      projectSizeSqft,
      location,
      budget,
      message,
    } = result.data;

    if (website) {
      return NextResponse.json({
        success: true,
        message: 'Your enquiry has been received.',
      });
    }

    const supabase = createAdminClient();
    const serviceValue = service.join(', ');
    const projectSizeValue = projectSizeSqft ? Number(projectSizeSqft) : null;

    const { data: enquiry, error: databaseError } = await supabase
      .from('enquiries')
      .insert({
        name,
        email,
        phone: phone || null,
        service: serviceValue,
        project_date: projectDate || null,
        project_size_sqft: projectSizeValue,
        location: location || null,
        budget: budget || null,
        message,
      })
      .select('id')
      .single();

    if (databaseError) {
      console.error('Supabase enquiry error:', databaseError);

      return NextResponse.json(
        {
          success: false,
          message: 'Unable to save your enquiry right now.',
        },
        { status: 500 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;
    const resendToEmail = process.env.RESEND_TO_EMAIL;

    if (!resendApiKey || !resendFromEmail || !resendToEmail) {
      console.error('Resend environment variables are missing.');

      return NextResponse.json(
        {
          success: false,
          enquiryId: enquiry.id,
          message: 'Your enquiry was saved, but the notification email could not be sent.',
        },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);

    const { error: emailError } = await resend.emails.send({
      from: resendFromEmail,
      to: [resendToEmail],
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #000000; max-width: 680px; margin: 0 auto; padding: 40px 24px;">
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #66666e; margin: 0 0 24px;">
            ST Photography
          </p>

          <h1 style="font-size: 32px; line-height: 1.1; font-weight: 500; margin: 0 0 40px;">
            New enquiry
          </h1>

          <div style="border-top: 1px solid #e6e6e9;">
            <div style="padding: 20px 0; border-bottom: 1px solid #e6e6e9;">
              <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #9999a1; margin: 0 0 8px;">
                Name
              </p>
              <p style="font-size: 16px; margin: 0;">
                ${name}
              </p>
            </div>

            <div style="padding: 20px 0; border-bottom: 1px solid #e6e6e9;">
              <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #9999a1; margin: 0 0 8px;">
                Email
              </p>
              <p style="font-size: 16px; margin: 0;">
                ${email}
              </p>
            </div>

            ${
              phone
                ? `
                  <div style="padding: 20px 0; border-bottom: 1px solid #e6e6e9;">
                    <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #9999a1; margin: 0 0 8px;">
                      Phone
                    </p>
                    <p style="font-size: 16px; margin: 0;">
                      ${phone}
                    </p>
                  </div>
                `
                : ''
            }

            <div style="padding: 20px 0; border-bottom: 1px solid #e6e6e9;">
              <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #9999a1; margin: 0 0 8px;">
                Service
              </p>
              <p style="font-size: 16px; margin: 0;">
                ${serviceValue}
              </p>
            </div>

            ${
              projectDate
                ? `
                  <div style="padding: 20px 0; border-bottom: 1px solid #e6e6e9;">
                    <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #9999a1; margin: 0 0 8px;">
                      Project Date
                    </p>
                    <p style="font-size: 16px; margin: 0;">
                      ${projectDate}
                    </p>
                  </div>
                `
                : ''
            }

            ${
              projectSizeSqft
                ? `
                  <div style="padding: 20px 0; border-bottom: 1px solid #e6e6e9;">
                    <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #9999a1; margin: 0 0 8px;">
                      Project Size
                    </p>
                    <p style="font-size: 16px; margin: 0;">
                      ${projectSizeSqft} sq ft
                    </p>
                  </div>
                `
                : ''
            }

            ${
              location
                ? `
                  <div style="padding: 20px 0; border-bottom: 1px solid #e6e6e9;">
                    <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #9999a1; margin: 0 0 8px;">
                      Location
                    </p>
                    <p style="font-size: 16px; margin: 0;">
                      ${location}
                    </p>
                  </div>
                `
                : ''
            }

            ${
              budget
                ? `
                  <div style="padding: 20px 0; border-bottom: 1px solid #e6e6e9;">
                    <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #9999a1; margin: 0 0 8px;">
                      Budget
                    </p>
                    <p style="font-size: 16px; margin: 0;">
                      ${budget}
                    </p>
                  </div>
                `
                : ''
            }

            <div style="padding: 20px 0; border-bottom: 1px solid #e6e6e9;">
              <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #9999a1; margin: 0 0 8px;">
                Message
              </p>
              <p style="font-size: 16px; line-height: 1.6; white-space: pre-wrap; margin: 0;">
                ${message}
              </p>
            </div>
          </div>

          <p style="font-size: 11px; color: #9999a1; margin: 32px 0 0;">
            Enquiry ID: ${enquiry.id}
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error('Resend enquiry notification error:', emailError);

      return NextResponse.json(
        {
          success: false,
          enquiryId: enquiry.id,
          message: 'Your enquiry was saved, but the notification email could not be sent.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      enquiryId: enquiry.id,
      message: 'Your enquiry has been received.',
    });
  } catch (error) {
    console.error('Enquiry API error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again.',
      },
      { status: 500 },
    );
  }
}
