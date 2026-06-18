import apiClient from "../api/axios.instance";

// ==================== BLOG API SERVICES ====================

export const blogApi = {
  // Get all blogs with pagination
  getAll: async (params = {}) => {
    const response = await apiClient.get("/blogs", {
      params,
    });
    return response;
  },

  // Get single blog by slug
  getBySlug: async (slug) => {
    if (!slug) throw new Error("Slug is required");
    const response = await apiClient.get(`/blogs/${slug}`);
    return response.blog;
  },

  // Get comments for a blog
  getComments: async (blogId) => {
    if (!blogId) throw new Error("Blog ID is required");
    // Make sure the URL matches your backend route
    const response = await apiClient.get(`/blogs/comments/${blogId}`);
    return response;
  },

  // Add comment to a blog
  addComment: async (data) => {
    const response = await apiClient.post("/blogs/add-comment", data);
    return response.data;
  },
};


export default blogApi;
