import { FC } from "react";

interface DropdownProps {
	list: any[],
	selectedItems: any[],
	addItem: Function,
	removeItem: Function,
}

const Dropdown: FC<DropdownProps> = ({ list, selectedItems, addItem, removeItem }) => {
	return (
		<div id="dropdown" className="absolute shadow top-100 bg-white z-40 lef-0 rounded max-h-select overflow-y-auto" style={{ width: 290 }}>
			<div className="flex flex-col w-full">
				{list.map((item: any, key: number) => {
					return <div key={key} className={"cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-sky-100 " + ((selectedItems.filter(e => e.key === item.key).length > 0) ? "bg-sky-200" : "")} onClick={() => (selectedItems.filter(e => e.key === item.key).length > 0) ? removeItem(item.key) : addItem(item.key)}>
						<div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-sky-100" >
							<div className="w-full items-center flex">
								<div className="mx-2 leading-6  ">
									{item.value}
								</div>
							</div>
						</div>
					</div>
				})}
			</div>
		</div >
	);
};

export default Dropdown;