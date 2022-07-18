import { AppError } from "../../../../shared/errors/AppError";
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
    const category = {
      name: "Category Test",
      description: "Category description test",
    };

    await createCategoryService.execute(category);

    const categoryCreated = await categoriesRepository.findByName(
      category.name
    );

    console.log(categoryCreated);

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Shouldn't be able to create a new category with an existing name", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category description test",
      };

      await createCategoryService.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryService.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
