'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import {
  AlertTriangle,
  Check,
  Eye,
  ImagePlus,
  Loader2,
  Save,
  Star,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  description: string;
  cover_image: string | null;
  images: string[] | null;
  featured: boolean;
  featured_order: number;
  published: boolean;
};

type ProjectEditFormProps = {
  project: Project;
};

const BUCKET = 'project-images';

const categories = ['Interior Photography', 'Interior Cinematography'];

function getStoragePath(url: string) {
  const marker = `/storage/v1/object/public/${BUCKET}/`;

  const index = url.indexOf(marker);

  if (index === -1) {
    return null;
  }

  return decodeURIComponent(url.slice(index + marker.length));
}

export function ProjectEditForm({ project }: ProjectEditFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState(project.title);
  const [slug, setSlug] = useState(project.slug);
  const [category, setCategory] = useState(project.category);
  const [location, setLocation] = useState(project.location);
  const [year, setYear] = useState(String(project.year));
  const [description, setDescription] = useState(project.description);
  const [featured, setFeatured] = useState(project.featured);
  const [featuredOrder, setFeaturedOrder] = useState(String(project.featured_order || 0));
  const [published, setPublished] = useState(project.published);

  const [coverImage, setCoverImage] = useState<string | null>(project.cover_image);
  const [galleryImages, setGalleryImages] = useState<string[]>(project.images || []);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function handleTitleChange(value: string) {
    setTitle(value);

    if (slug === project.slug || !slug) {
      setSlug(createSlug(value));
    }
  }

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    setCoverFile(file);
    setError('');
  }

  function handleGalleryChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);

    const validFiles = files.filter((file) => file.type.startsWith('image/'));

    if (validFiles.length !== files.length) {
      setError('Only image files can be added to the gallery.');
      return;
    }

    setGalleryFiles((current) => [...current, ...validFiles]);
    setError('');
  }

  function removeGalleryImage(image: string) {
    setGalleryImages((current) => current.filter((item) => item !== image));
  }

  function removeNewGalleryFile(file: File) {
    setGalleryFiles((current) =>
      current.filter(
        (item) =>
          item.name !== file.name ||
          item.size !== file.size ||
          item.lastModified !== file.lastModified,
      ),
    );
  }

  async function uploadFile(file: File, folder: string) {
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `${crypto.randomUUID()}.${extension}`;
    const path = `${slug}/${folder}/${filename}`;

    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(path);

    return publicUrl;
  }

  async function deleteStorageFile(url: string) {
    const path = getStoragePath(url);

    if (!path) {
      return;
    }

    const { error: removeError } = await supabase.storage.from(BUCKET).remove([path]);

    if (removeError) {
      console.error('Storage delete error:', removeError);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSaving(true);
    setError('');
    setMessage('');

    try {
      if (!title.trim()) {
        throw new Error('Please enter a project title.');
      }

      if (!slug.trim()) {
        throw new Error('Please enter a project slug.');
      }

      if (!description.trim()) {
        throw new Error('Please enter a project description.');
      }

      let nextCoverImage = coverImage;

      if (coverFile) {
        const uploadedCover = await uploadFile(coverFile, 'cover');

        if (coverImage) {
          await deleteStorageFile(coverImage);
        }

        nextCoverImage = uploadedCover;
      }

      const uploadedGalleryImages: string[] = [];

      for (const file of galleryFiles) {
        const uploadedImage = await uploadFile(file, 'gallery');
        uploadedGalleryImages.push(uploadedImage);
      }

      const nextGalleryImages = [...galleryImages, ...uploadedGalleryImages];

      const { error: databaseError } = await supabase
        .from('projects')
        .update({
          slug: slug.trim(),
          title: title.trim(),
          category,
          location: location.trim(),
          year: Number(year) || new Date().getFullYear(),
          description: description.trim(),
          cover_image: nextCoverImage,
          images: nextGalleryImages,
          featured,
          featured_order: featured ? Number(featuredOrder) || 0 : 0,
          published,
        })
        .eq('id', project.id);

      if (databaseError) {
        throw new Error(databaseError.message);
      }

      setCoverImage(nextCoverImage);
      setGalleryImages(nextGalleryImages);
      setCoverFile(null);
      setGalleryFiles([]);
      setMessage('Project updated successfully.');

      router.refresh();
    } catch (submitError) {
      console.error('Project update error:', submitError);

      setError(
        submitError instanceof Error ? submitError.message : 'Unable to update the project.',
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      'Delete this project permanently? This will also remove its uploaded images.',
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setError('');
    setMessage('');

    try {
      const storageUrls = [coverImage, ...galleryImages].filter((url): url is string =>
        Boolean(url),
      );

      for (const url of storageUrls) {
        await deleteStorageFile(url);
      }

      const { error: databaseError } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id);

      if (databaseError) {
        throw new Error(databaseError.message);
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (deleteError) {
      console.error('Project deletion error:', deleteError);

      setError(
        deleteError instanceof Error ? deleteError.message : 'Unable to delete the project.',
      );

      setIsDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-16 lg:grid-cols-[1fr_360px] lg:gap-24">
        <div className="space-y-12">
          <section className="space-y-8">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                Project information
              </p>

              <div className="h-px w-full bg-foreground/10" />
            </div>

            <div className="space-y-7">
              <label className="block">
                <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                  Title
                </span>

                <input
                  value={title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  className="w-full border-b border-foreground/20 bg-transparent py-3 font-serif text-3xl tracking-[-0.02em] outline-none transition-colors placeholder:text-muted focus:border-foreground"
                  placeholder="Project title"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                  Slug
                </span>

                <input
                  value={slug}
                  onChange={(event) => setSlug(createSlug(event.target.value))}
                  className="w-full border-b border-foreground/20 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-foreground"
                  placeholder="project-slug"
                />
              </label>

              <div className="grid gap-7 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                    Category
                  </span>

                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="w-full border-b border-foreground/20 bg-background py-3 text-sm outline-none focus:border-foreground"
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                    Year
                  </span>

                  <input
                    type="number"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                    className="w-full border-b border-foreground/20 bg-transparent py-3 text-sm outline-none focus:border-foreground"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                  Location
                </span>

                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="w-full border-b border-foreground/20 bg-transparent py-3 text-sm outline-none placeholder:text-muted focus:border-foreground"
                  placeholder="Dhaka"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                  Description
                </span>

                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={6}
                  className="w-full resize-none border border-foreground/15 bg-transparent p-4 text-sm leading-7 outline-none transition-colors placeholder:text-muted focus:border-foreground/40"
                  placeholder="Describe the project..."
                />
              </label>
            </div>
          </section>

          <section className="space-y-8">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                Cover image
              </p>

              <div className="h-px w-full bg-foreground/10" />
            </div>

            {coverImage || coverFile ? (
              <div className="relative aspect-[16/9] overflow-hidden bg-subtle">
                {coverFile ? (
                  <Image
                    src={URL.createObjectURL(coverFile)}
                    alt="New cover preview"
                    fill
                    className="object-cover"
                  />
                ) : coverImage ? (
                  <Image
                    src={coverImage}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                ) : null}

                <label className="absolute bottom-4 left-4 flex cursor-pointer items-center gap-2 bg-background px-4 py-3 text-[9px] font-medium uppercase tracking-[0.16em]">
                  <Upload size={13} strokeWidth={1.4} />
                  Replace
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverChange}
                  />
                </label>

                {coverFile && (
                  <button
                    type="button"
                    onClick={() => setCoverFile(null)}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-background transition-opacity hover:opacity-60"
                    aria-label="Remove new cover"
                  >
                    <X size={14} strokeWidth={1.4} />
                  </button>
                )}
              </div>
            ) : (
              <label className="flex aspect-[16/9] cursor-pointer flex-col items-center justify-center border border-dashed border-foreground/20 bg-subtle transition-colors hover:border-foreground/40">
                <ImagePlus size={24} strokeWidth={1.2} />

                <span className="mt-4 text-[9px] font-medium uppercase tracking-[0.18em]">
                  Upload cover image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverChange}
                />
              </label>
            )}
          </section>

          <section className="space-y-8">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                Gallery
              </p>

              <div className="h-px w-full bg-foreground/10" />
            </div>

            {galleryImages.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {galleryImages.map((image) => (
                  <div
                    key={image}
                    className="group relative aspect-[4/5] overflow-hidden bg-subtle"
                  >
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeGalleryImage(image)}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-background opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="Remove gallery image"
                    >
                      <X size={13} strokeWidth={1.4} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {galleryFiles.length > 0 && (
              <div className="space-y-2">
                {galleryFiles.map((file) => (
                  <div
                    key={`${file.name}-${file.lastModified}`}
                    className="flex items-center justify-between border border-foreground/10 px-4 py-3"
                  >
                    <span className="truncate text-xs">{file.name}</span>

                    <button
                      type="button"
                      onClick={() => removeNewGalleryFile(file)}
                      className="ml-4 shrink-0 text-muted transition-colors hover:text-foreground"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X size={14} strokeWidth={1.4} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="flex cursor-pointer items-center justify-center gap-3 border border-dashed border-foreground/20 px-6 py-8 text-[9px] font-medium uppercase tracking-[0.18em] transition-colors hover:border-foreground/40">
              <ImagePlus size={16} strokeWidth={1.3} />
              Add gallery images
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleGalleryChange}
              />
            </label>
          </section>
        </div>

        <aside className="space-y-10 lg:sticky lg:top-10 lg:self-start">
          <section className="border border-foreground/10 p-6">
            <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
              Visibility
            </p>

            <button
              type="button"
              onClick={() => setPublished((current) => !current)}
              className="flex w-full items-center justify-between border-b border-foreground/10 py-4 text-left"
            >
              <div>
                <p className="text-sm">Published</p>
                <p className="mt-1 text-[10px] text-muted">
                  {published ? 'Visible on the website' : 'Saved as draft'}
                </p>
              </div>

              <span
                className={`h-5 w-9 rounded-full p-1 transition-colors ${published ? 'bg-foreground' : 'bg-foreground/15'}`}
              >
                <span
                  className={`block h-3 w-3 rounded-full transition-transform ${published ? 'translate-x-4 bg-background' : 'translate-x-0 bg-foreground/50'}`}
                />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFeatured((current) => !current)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <div>
                <p className="flex items-center gap-2 text-sm">
                  <Star size={14} strokeWidth={1.3} />
                  Featured
                </p>

                <p className="mt-1 text-[10px] text-muted">Show this project in featured work</p>
              </div>

              <span
                className={`h-5 w-9 rounded-full p-1 transition-colors ${featured ? 'bg-foreground' : 'bg-foreground/15'}`}
              >
                <span
                  className={`block h-3 w-3 rounded-full transition-transform ${featured ? 'translate-x-4 bg-background' : 'translate-x-0 bg-foreground/50'}`}
                />
              </span>
            </button>

            {featured && (
              <label className="mt-5 block border-t border-foreground/10 pt-5">
                <span className="mb-3 block text-[9px] font-medium uppercase tracking-[0.18em] text-muted">
                  Featured order
                </span>

                <input
                  type="number"
                  min="0"
                  value={featuredOrder}
                  onChange={(event) => setFeaturedOrder(event.target.value)}
                  className="w-full border border-foreground/15 bg-transparent px-3 py-3 text-sm outline-none focus:border-foreground/40"
                />
              </label>
            )}
          </section>

          {error && (
            <div className="flex gap-3 border border-foreground/20 p-4 text-sm leading-6">
              <AlertTriangle size={16} strokeWidth={1.3} className="mt-1 shrink-0" />

              <p>{error}</p>
            </div>
          )}

          {message && (
            <div className="flex gap-3 border border-foreground/20 p-4 text-sm leading-6">
              <Check size={16} strokeWidth={1.3} className="mt-1 shrink-0" />

              <p>{message}</p>
            </div>
          )}
          <Link
            href={`/admin/projects/${project.id}/preview`}
            target="_blank"
            className="flex w-full items-center justify-center gap-3 border border-foreground/20 px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <Eye size={14} strokeWidth={1.4} />
            Preview
          </Link>
          <button
            type="submit"
            disabled={isSaving || isDeleting}
            className="flex w-full items-center justify-center gap-3 bg-foreground px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSaving ? (
              <>
                <Loader2 size={14} strokeWidth={1.4} className="animate-spin" />
                Saving
              </>
            ) : (
              <>
                <Save size={14} strokeWidth={1.4} />
                Save Changes
              </>
            )}
          </button>

          <div className="border-t border-foreground/10 pt-8">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSaving || isDeleting}
              className="flex w-full items-center justify-center gap-3 border border-foreground/15 px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:border-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={14} strokeWidth={1.4} className="animate-spin" />
                  Deleting
                </>
              ) : (
                <>
                  <Trash2 size={14} strokeWidth={1.4} />
                  Delete Project
                </>
              )}
            </button>
          </div>
        </aside>
      </div>
    </form>
  );
}
