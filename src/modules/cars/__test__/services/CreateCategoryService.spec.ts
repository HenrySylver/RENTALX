import { CreateCategoryService } from "../../services/CreateCategoryService";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

let createCategoryService: CreateCategoryService;

let categoriesRepository: CategoriesRepository;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepository();

    createCategoryService = new CreateCategoryService(categoriesRepository);
  });

  it("Should be able to create a new category", async () => {
    const testCategory = {
      name: "Category Test",
      description: "Category description test",
    };

    await createCategoryService.execute(testCategory);

    const categoryCreated = await categoriesRepository.findByName(
      testCategory.name
    );

    console.log(categoryCreated);

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Shouldn't be able to create a new category with a previously created category name", async () => {
    expect(async () => {
      const testCategory = {
        name: "Category Test",
        description: "Category description test",
      };

      await createCategoryService.execute(testCategory);

      const categoryCreated = await categoriesRepository.findByName(
        testCategory.name
      );
    }).rejects.toBeInstanceOf();
  });
});
