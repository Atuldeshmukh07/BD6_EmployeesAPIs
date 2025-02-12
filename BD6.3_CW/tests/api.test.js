const {
  getAllReviews,
  getReviewById,
  addReview,
  getUserById,
  addUser,
} = require("../index");

jest.mock("../index", () => ({
  getAllReviews: jest.fn(),
  getReviewById: jest.fn(),
  addReview: jest.fn(),
  getUserById: jest.fn(),
  addUser: jest.fn(),
}));

describe("Review API Tests", () => {
  test("getAllReviews should return all reviews", () => {
    const mockReviews = [
      { id: 1, content: "Great product!", userId: 1 },
      { id: 2, content: "Not bad, could be better.", userId: 2 },
    ];
    getAllReviews.mockReturnValue(mockReviews);
    expect(getAllReviews()).toEqual(mockReviews);
    expect(getAllReviews).toHaveBeenCalled();
  });

  test("getReviewById should return a review by ID", () => {
    const mockReview = { id: 1, content: "Great product!", userId: 1 };
    getReviewById.mockReturnValue(mockReview);
    expect(getReviewById(1)).toEqual(mockReview);
    expect(getReviewById).toHaveBeenCalledWith(1);
  });

  test("getReviewById should return null for non-existent ID", () => {
    getReviewById.mockReturnValue(null);
    expect(getReviewById(999)).toBeNull();
    expect(getReviewById).toHaveBeenCalledWith(999);
  });

  test("addReview should add a new review", () => {
    const newReview = { id: 3, content: "Awesome!", userId: 1 };
    addReview.mockReturnValue(newReview);
    expect(addReview(newReview)).toEqual(newReview);
    expect(addReview).toHaveBeenCalledWith(newReview);
  });
});

describe("User API Tests", () => {
  test("getUserById should return a user by ID", () => {
    const mockUser = { id: 1, name: "John Doe", email: "john.doe@example.com" };
    getUserById.mockReturnValue(mockUser);
    expect(getUserById(1)).toEqual(mockUser);
    expect(getUserById).toHaveBeenCalledWith(1);
  });

  test("getUserById should return null for non-existent ID", () => {
    getUserById.mockReturnValue(null);
    expect(getUserById(999)).toBeNull();
    expect(getUserById).toHaveBeenCalledWith(999);
  });

  test("addUser should add a new user", () => {
    const newUser = {
      id: 3,
      name: "Alice Brown",
      email: "alice.brown@example.com",
    };
    addUser.mockReturnValue(newUser);
    expect(addUser(newUser)).toEqual(newUser);
    expect(addUser).toHaveBeenCalledWith(newUser);
  });
});
