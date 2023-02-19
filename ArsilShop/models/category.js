import {GlobalStyles} from '../components/constants/styles'
class Category {
  constructor(id, name, title, color,other_info) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.color = color ? color : GlobalStyles.colors.darkblue2;
    this.other_info = other_info;
  }
}

export default Category;
