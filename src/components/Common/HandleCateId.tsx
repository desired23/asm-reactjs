import { ICategory } from '../../interfaces/category';
interface IPropsHandleCateId {
  categories: ICategory[];
  cates: ICategory[];
}
const HandleCateId = (props: IPropsHandleCateId) => {
  console.log(props.categories);
  console.log(props.cates);
  const cateNames: string[] = [];
  props.cates.forEach((categoryId) => {
    const category = props.categories.find((cate) => String(cate._id) === String(categoryId));
    if (category) {
      cateNames.push(category.name);
    }
  })
  console.log(cateNames);
if (cateNames.length > 0) {
  return (
    <div>
      {cateNames.map((name, index) => {
        return <a  className='btn btn-outline-dark mx-1' href="" key={index}>{name} </a> 
      })}
    </div>
  )
} else return <>loading</>
}

export default HandleCateId