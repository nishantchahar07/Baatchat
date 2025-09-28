export const capitialize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const generateAvatarSVG = (name) => {
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : "U";
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="64" fill="#14b8a6"/>
      <text x="64" y="80" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">${initials}</text>
    </svg>
  `)}`;
};