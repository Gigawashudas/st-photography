'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { ArrowLeft, Check, ImagePlus, Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type SelectedImage = {
  id: string;
  file: File;
  preview: string;
};

const BUCKET_NAME = 'project-images';

const categories = ['Interior Photography', 'Interior Cinematography'];

export function ProjectForm() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Interior Photography');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [featuredOrder, setFeaturedOrder] = useState('0');
  const [published, setPublished] = useState(true);

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState('');

  const [galleryImages, setGalleryImages] = useState<SelectedImage[]>([]);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Cover image must be an image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Cover image must be smaller than 10MB.');
      return;
    }

    setError('');
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  function handleGalleryChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    const invalidFiles = files.filter(
      (file) => !file.type.startsWith('image/') || file.size > 10 * 1024 * 1024,
    );

    if (invalidFiles.length > 0) {
      setError('Gallery images must be JPG, PNG or WebP files under 10MB.');
      event.target.value = '';
      return;
    }

    const newImages = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setGalleryImages((current) => [...current, ...newImages]);
    setError('');
    event.target.value = '';
  }

  function removeGalleryImage(id: string) {
    setGalleryImages((current) => {
      const image = current.find((item) => item.id === id);

      if (image) {
        URL.revokeObjectURL(image.preview);
      }

      return current.filter((item) => item.id !== id);
    });
  }

  function removeCover() {
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverImage(null);
    setCoverPreview('');
  }

  async function uploadImage(file: File, projectSlug: string, type: string) {
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';

    const filename = `${crypto.randomUUID()}.${extension}`;
    const path = `${projectSlug}/${type}/${filename}`;

    const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(path, file, {
      cacheControl: '31536000',
      upsert: false,
      contentType: file.type,
    });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);

    return publicUrl;
  }

  function validateYoutubeUrl(value: string) {
    if (!value.trim()) {
      return true;
    }

    try {
      const url = new URL(value.trim());

      return (
        url.hostname === 'youtube.com' ||
        url.hostname === 'www.youtube.com' ||
        url.hostname === 'youtu.be' ||
        url.hostname === 'www.youtu.be'
      );
    } catch {
      return false;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setSuccess('');

    if (!title.trim()) {
      setError('Please enter a project title.');
      return;
    }

    if (!coverImage) {
      setError('Please select a cover image.');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a project description.');
      return;
    }

    if (category === 'Interior Cinematography' && !youtubeUrl.trim()) {
      setError('Please enter the YouTube URL for this cinematography project.');
      return;
    }

    if (youtubeUrl.trim() && !validateYoutubeUrl(youtubeUrl)) {
      setError('Please enter a valid YouTube URL.');
      return;
    }

    setIsSaving(true);

    try {
      const slug = createSlug(title);

      if (!slug) {
        throw new Error('Please enter a valid project title.');
      }

      const { data: existingProject, error: slugError } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', slug)
        .maybeSingle();

      if (slugError) {
        throw new Error(slugError.message);
      }

      if (existingProject) {
        throw new Error('A project with this title already exists. Please choose another title.');
      }

      setSuccess('Uploading cover image...');

      const coverUrl = await uploadImage(coverImage, slug, 'cover');

      const galleryUrls: string[] = [];

      for (let index = 0; index < galleryImages.length; index += 1) {
        setSuccess(`Uploading gallery image ${index + 1} of ${galleryImages.length}...`);

        const url = await uploadImage(galleryImages[index].file, slug, 'gallery');

        galleryUrls.push(url);
      }

      setSuccess('Creating project...');

      const { error: databaseError } = await supabase.from('projects').insert({
        slug,
        title: title.trim(),
        category,
        location: location.trim(),
        year: Number(year) || new Date().getFullYear(),
        description: description.trim(),
        cover_image: coverUrl,
        images: galleryUrls,
        youtube_url: category === 'Interior Cinematography' ? youtubeUrl.trim() : null,
        featured,
        featured_order: featured ? Number(featuredOrder) || 0 : 0,
        published,
      });

      if (databaseError) {
        throw new Error(databaseError.message);
      }

      setSuccess('Project created successfully.');

      setTimeout(() => {
        router.push('/admin/projects');
        router.refresh();
      }, 700);
    } catch (submitError) {
      console.error('Project creation error:', submitError);

      setError(submitError instanceof Error ? submitError.message : 'Unable to create project.');

      setSuccess('');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[1100px]">
      <div className="grid gap-16 lg:grid-cols-[1fr_360px] lg:gap-24">
        <div className="space-y-14">
          <section>
            <p className="text-muted mb-6 text-[10px] font-medium tracking-[0.2em] uppercase">
              Project information
            </p>

            <div className="space-y-8">
              <div>
                <label
                  htmlFor="title"
                  className="text-muted mb-3 block text-[10px] font-medium tracking-[0.18em] uppercase"
                >
                  Title
                </label>

                <input
                  id="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="House of Stillness"
                  className="border-foreground/20 placeholder:text-muted/50 focus:border-foreground min-h-14 w-full border-b bg-transparent py-4 font-serif text-2xl leading-tight transition-colors outline-none sm:min-h-16 sm:text-3xl lg:text-4xl"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="text-muted mb-3 block text-[10px] font-medium tracking-[0.18em] uppercase"
                >
                  Category
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="border-foreground/20 bg-background text-foreground focus:border-foreground min-h-14 w-full border-b py-3 text-base leading-7 transition-colors outline-none sm:min-h-16 sm:text-lg sm:leading-8"
                >
                  {categories.map((item) => (
                    <option key={item} value={item} className="bg-background text-foreground">
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="text-muted mb-3 block text-[10px] font-medium tracking-[0.18em] uppercase"
                >
                  Year
                </label>

                <input
                  id="year"
                  type="number"
                  min="1900"
                  max="2100"
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                  className="border-foreground/20 focus:border-foreground min-h-14 w-full border-b bg-transparent py-3 text-base leading-7 transition-colors outline-none sm:min-h-16 sm:text-lg sm:leading-8"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="text-muted mb-3 block text-[10px] font-medium tracking-[0.18em] uppercase"
                >
                  Location
                </label>

                <input
                  id="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Dhaka"
                  className="border-foreground/20 placeholder:text-muted/60 focus:border-foreground min-h-14 w-full border-b bg-transparent py-3 text-base leading-7 transition-colors outline-none sm:min-h-16 sm:text-lg sm:leading-8"
                />
              </div>

              {category === 'Interior Cinematography' && (
                <div>
                  <label
                    htmlFor="youtubeUrl"
                    className="text-muted mb-3 block text-[10px] font-medium tracking-[0.18em] uppercase"
                  >
                    YouTube URL
                  </label>

                  <input
                    id="youtubeUrl"
                    type="url"
                    value={youtubeUrl}
                    onChange={(event) => setYoutubeUrl(event.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="border-foreground/20 placeholder:text-muted/60 focus:border-foreground min-h-14 w-full border-b bg-transparent py-3 text-base leading-7 transition-colors outline-none sm:min-h-16 sm:text-lg sm:leading-8"
                  />

                  <p className="text-muted mt-3 text-xs leading-6 sm:text-sm sm:leading-7">
                    The finished cinematography video will be embedded from YouTube. Upload the
                    thumbnail below.
                  </p>
                </div>
              )}

              <div>
                <label
                  htmlFor="description"
                  className="text-muted mb-3 block text-[10px] font-medium tracking-[0.18em] uppercase"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe the project..."
                  rows={6}
                  className="border-foreground/20 placeholder:text-muted/60 focus:border-foreground min-h-[180px] w-full resize-none border-b bg-transparent py-4 text-base leading-7 transition-colors outline-none sm:min-h-[210px] sm:text-lg sm:leading-8"
                />
              </div>
            </div>
          </section>

          <section>
            <p className="text-muted mb-6 text-[10px] font-medium tracking-[0.2em] uppercase">
              {category === 'Interior Cinematography' ? 'Video thumbnail' : 'Cover image'}
            </p>

            {coverPreview ? (
              <div className="bg-subtle relative aspect-[16/10] overflow-hidden">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={removeCover}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition-transform hover:scale-105"
                  aria-label="Remove cover image"
                >
                  <X size={15} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <label className="group border-foreground/20 bg-subtle hover:border-foreground/50 flex aspect-[16/10] cursor-pointer flex-col items-center justify-center border border-dashed px-6 text-center transition-colors">
                <ImagePlus
                  size={24}
                  strokeWidth={1.2}
                  className="text-muted transition-transform duration-300 group-hover:scale-110"
                />

                <span className="mt-5 text-[10px] font-medium tracking-[0.2em] uppercase">
                  Select {category === 'Interior Cinematography' ? 'thumbnail' : 'cover image'}
                </span>

                <span className="text-muted mt-2 text-xs leading-5 sm:text-sm">
                  JPG, PNG or WebP · Max 10MB
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleCoverChange}
                  className="hidden"
                />
              </label>
            )}
          </section>

          <section>
            <div className="mb-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end sm:gap-6">
              <div>
                <p className="text-muted text-[10px] font-medium tracking-[0.2em] uppercase">
                  Gallery
                </p>

                <p className="text-secondary mt-2 text-sm leading-6">
                  Add additional project images.
                </p>
              </div>

              <label className="border-foreground/20 hover:border-foreground flex min-h-11 shrink-0 cursor-pointer items-center gap-2 border px-4 py-3 text-[10px] font-medium tracking-[0.15em] uppercase transition-colors">
                <ImagePlus size={13} strokeWidth={1.4} />
                Add Images
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleGalleryChange}
                  className="hidden"
                />
              </label>
            </div>

            {galleryImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {galleryImages.map((image) => (
                  <div
                    key={image.id}
                    className="group bg-subtle relative aspect-[4/3] overflow-hidden"
                  >
                    <img src={image.preview} alt="" className="h-full w-full object-cover" />

                    <button
                      type="button"
                      onClick={() => removeGalleryImage(image.id)}
                      className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
                      aria-label="Remove gallery image"
                    >
                      <X size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-foreground/15 border border-dashed py-16 text-center">
                <p className="text-muted text-[10px] tracking-[0.18em] uppercase">
                  No gallery images selected
                </p>
              </div>
            )}
          </section>
        </div>

        <aside className="lg:sticky lg:top-10 lg:self-start">
          <div className="border-foreground/10 border-t pt-8">
            <p className="text-muted mb-8 text-[10px] font-medium tracking-[0.2em] uppercase">
              Publishing
            </p>

            <div className="space-y-7">
              <label className="flex min-h-16 cursor-pointer items-center justify-between gap-6">
                <div>
                  <p className="text-base">Published</p>

                  <p className="text-secondary mt-1 text-sm leading-6">
                    Make this project visible on the website.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={published}
                  onChange={(event) => setPublished(event.target.checked)}
                  className="h-5 w-5 accent-current"
                />
              </label>

              <label className="flex min-h-16 cursor-pointer items-center justify-between gap-6">
                <div>
                  <p className="text-base">Featured</p>

                  <p className="text-secondary mt-1 text-sm leading-6">
                    Show this project in Featured Work.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) => setFeatured(event.target.checked)}
                  className="h-5 w-5 accent-current"
                />
              </label>

              {featured && (
                <div>
                  <label
                    htmlFor="featuredOrder"
                    className="text-muted mb-3 block text-[10px] font-medium tracking-[0.18em] uppercase"
                  >
                    Featured order
                  </label>

                  <input
                    id="featuredOrder"
                    type="number"
                    min="0"
                    value={featuredOrder}
                    onChange={(event) => setFeaturedOrder(event.target.value)}
                    className="border-foreground/20 focus:border-foreground min-h-12 w-full border-b bg-transparent py-3 text-base leading-7 outline-none sm:min-h-14 sm:text-lg sm:leading-8"
                  />
                </div>
              )}
            </div>
          </div>

          {(error || success) && (
            <div className="border-foreground/10 mt-10 border-t pt-8">
              {error && <p className="text-sm leading-6 text-red-500">{error}</p>}

              {success && !error && (
                <p className="flex items-center gap-2 text-sm leading-6">
                  <Check size={15} strokeWidth={1.5} />
                  {success}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="bg-foreground text-background mt-10 flex min-h-14 w-full items-center justify-center gap-3 px-6 py-4 text-[10px] font-medium tracking-[0.2em] uppercase transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Saving
              </>
            ) : (
              'Create Project'
            )}
          </button>

          <button
            type="button"
            onClick={() => router.push('/admin/projects')}
            disabled={isSaving}
            className="text-muted hover:text-foreground mt-3 flex min-h-14 w-full items-center justify-center gap-2 px-6 py-4 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors"
          >
            <ArrowLeft size={13} strokeWidth={1.4} />
            Cancel
          </button>
        </aside>
      </div>
    </form>
  );
}
