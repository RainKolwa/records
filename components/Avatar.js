import Image from 'next/image';

export default function Avatar({ src, alt, className }) {
  return (
    <Image
      className={`w-10 h-10 rounded-full ${className}`}
      src={src}
      alt={alt || 'avatar'}
    />
  );
}
