import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimit } from '@/lib/rate-limit';

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

    const { website, name, email, phone, service, projectDate, location, budget, message } =
      result.data;

    if (website) {
      return NextResponse.json({
        success: true,
        message: 'Your enquiry has been received.',
      });
    }

    const supabase = createAdminClient();

    /*
     * The form sends an array:
     *
     * ['Photography']
     * ['Cinematography']
     * ['Photography', 'Cinematography']
     *
     * We store it as a single readable string in the existing
     * database service column.
     */
    const serviceValue = service.join(', ');

    const { data: enquiry, error: databaseError } = await supabase
      .from('enquiries')
      .insert({
        name,
        email,
        phone: phone || null,
        service: serviceValue,
        project_date: projectDate || null,
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
