import apiClient from '../api/client';

export const reviewService = {
  /**
   * POST /api/customer/reviews
   * Body: { model_id, rating, comment }
   */
  createReview: async (payload) => {
    // Explicitly send payload as expected by backend
    const data = {
      model_id: payload.model_id,
      rating: Number(payload.rating),
      comment: payload.comment,
    };

    const response = await apiClient.post('/reviews', data);
    console.log('[reviewService] createReview response:', response.data);
    return response.data;
  },

  /**
   * PUT /api/customer/reviews/:id
   * Body: { rating, comment }
   */
  updateReview: async (id, payload) => {
    const data = {
      rating: Number(payload.rating),
      comment: payload.comment,
    };

    const response = await apiClient.put(`/reviews/${id}`, data);
    console.log('[reviewService] updateReview response:', response.data);
    return response.data;
  },

  /**
   * DELETE /api/customer/reviews/:id
   */
  deleteReview: async (id) => {
    const response = await apiClient.delete(`/reviews/${id}`);
    console.log('[reviewService] deleteReview response:', response.data);
    return response.data;
  },

  /**
   * GET /api/customer/reviews/my-reviews
   * Returns list of user's reviews
   */
  getMyReviews: async () => {
    try {
      const response = await apiClient.get('/reviews/my-reviews');
      const body = response.data;
      console.log('[reviewService] getMyReviews raw response:', body);

      // Handle different possible response structures
      if (Array.isArray(body)) return body;
      if (body?.reviews && Array.isArray(body.reviews)) return body.reviews;
      if (body?.data?.reviews && Array.isArray(body.data.reviews)) return body.data.reviews;
      if (body?.data && Array.isArray(body.data)) return body.data;

      return [];
    } catch (error) {
      console.error('[reviewService] getMyReviews error:', error);
      return [];
    }
  },
};
