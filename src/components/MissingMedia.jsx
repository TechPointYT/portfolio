// Stands in for a video that hasn't been added to public/media yet.
export default function MissingMedia({ src, label }) {
  return (
    <div className="media-missing" role="img" aria-label={label}>
      <span>Add {src} to public/media.</span>
    </div>
  );
}
