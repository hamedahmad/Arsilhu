class Product {
  constructor(
    id,
    title,
    fragility,
    package_weight,
    price_sector,
    package_height,
    package_width,
    package_depth,
    other_info,
    categoryIds
  ) {
    this.id = id;
    this.title = title;
    this.fragility = fragility;
    this.package_weight = package_weight;
    this.price_sector = price_sector;
    this.package_height = package_height;
    this.package_width = package_width;
    this.package_depth = package_depth;
    this.other_info = other_info;
    this.categoryIds = categoryIds;
  }
}

export default Product;
