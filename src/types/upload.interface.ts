export interface Upload {
  id: number;
  name: string;
  path: string; // CloudFront URL, usable directly in <img src>
  type: string;
  mime: string;
  size: number;
  altText: string | null;
  createDate: string;
  updateDate: string;
}
