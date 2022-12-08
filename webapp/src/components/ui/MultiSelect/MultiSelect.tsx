import { FC, useState } from 'react';
import Dropdown from '../Dropdown';
import { ItemProps } from 'src/pages/DocRegistration/DocRegistration';

interface MSProps {
	items: ItemProps[],
	selectedItems: ItemProps[],
	setSelected: Function
}

const Multiselect: FC<MSProps> = ({ items, selectedItems, setSelected }) => {
	const [dropdown, setDropdown] = useState(false);

	const openDropdown = () => {
		setDropdown(true)
	};

	const closeDropdown = () => {
		setDropdown(false)
	};

	const addTag = (key: any) => {
		setSelected(selectedItems.concat(items.filter((e) => e.key === key)));
	};

	const removeTag = (key: any) => {
		setSelected(selectedItems.filter((e) => e.key !== key));
	}

	return (<div className="autcomplete-wrapper " style={{ width: 290 }}>
		<div className="autcomplete">
			<div className="w-full flex flex-col items-center mx-auto">
				<div className="w-full">
					<div className="flex flex-col items-center relative">
						<div className="w-full">
							<div className="my-2 p-1 flex border border-gray-200 bg-white rounded shadow">
								<div className="flex flex-auto flex-wrap" onClick={openDropdown}>
									{
										selectedItems.map(({ value, key }, index) => {
											return (
												<div key={index} className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-sky-700 bg-sky-100 border border-sky-300 ">
													<div className="text-xs font-normal leading-none max-w-full flex-initial">{value}</div>
													<div className="flex flex-auto flex-row-reverse">
														<div onClick={() => removeTag(key)}>
															<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
																className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
																<line x1="18" y1="6" x2="6" y2="18"></line>
																<line x1="6" y1="6" x2="18" y2="18"></line>
															</svg>
														</div>
													</div>
												</div>)
										})
									}
									<div className="flex-1" >
										<input placeholder={selectedItems.length > 0 ? "" : "Szakterületek kiválasztása"} className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800" readOnly onClick={openDropdown} />
									</div>
								</div>
								<div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200" onClick={dropdown ? closeDropdown : openDropdown}>
									<div className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
										<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" transform={dropdown ? "rotate(0)" : "rotate(180)"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
											<polyline points="18 15 12 9 6 15"></polyline>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
					{dropdown ? <Dropdown list={items} selectedItems={selectedItems} addItem={addTag} removeItem={removeTag}></Dropdown> : null}
				</div>
			</div>

		</div>
	</div >)
};

export default Multiselect;