import { Item } from './Item.components';

export const SearchList = () => {
  return (
    <>
      <div className="bg-white shadow-md shadow-gray-500 rounded-3xl px-10 pt-6 pb-10 dark:shadow-none dark:bg-dark flex flex-col gap-3">
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </>
  );
};
