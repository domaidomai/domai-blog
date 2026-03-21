export const normalizeBasePath = (basePath: string) => {
  if (!basePath || basePath === "/") {
    return "/";
  }

  const normalized = basePath.startsWith("/") ? basePath : `/${basePath}`;
  return normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
};

export const withBasePath = (path: string, basePath = "/") => {
  const normalizedBase = normalizeBasePath(basePath);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedBase === "/") {
    return normalizedPath;
  }

  return `${normalizedBase}${normalizedPath}`;
};
