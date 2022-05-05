import React from "react";
import { useState } from "react";
import s from "./Paginator.module.css";
import cn from "classnames";

type PropsType = {
	totalItemsCount: number;
	currentPage: number;
	onPageChanged: (p: number) => void;
	pageSize: number;
	portionSize?: number;
};

let Paginator: React.FC<PropsType> = ({
	totalItemsCount,
	currentPage,
	onPageChanged,
	pageSize,
	portionSize = 20,
}) => {
	let pagesCount = Math.ceil(totalItemsCount / pageSize);
	let pages: Array<number> = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	let portionCount = Math.ceil(pagesCount / portionSize);
	let [portionNumber, setPortionNumber] = useState(1);
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionPageNumber = portionNumber * portionSize;

	return (
		<div className={s.paginator}>
			{portionNumber > 1 && (
				<button
					onClick={() => {
						setPortionNumber(portionNumber - 1);
					}}
				>
					PREVIOUS
				</button>
			)}
			{pages
				.filter(
					(p) =>
						p >= leftPortionPageNumber &&
						p <= rightPortionPageNumber
				)
				.map((p) => {
					return (
						<span
							className={cn(
								{
									[s.selectedPage]: currentPage === p,
								},
								s.pageNumber
							)}
							key={p}
							onClick={() => {
								onPageChanged(p);
							}}
						>
							{p}
						</span>
					);
				})}
			{portionCount > portionNumber && (
				<button
					onClick={() => {
						setPortionNumber(portionNumber + 1);
					}}
				>
					NEXT
				</button>
			)}
			Всего страниц: {pagesCount}, текущая: {currentPage}
		</div>
	);
};

export default Paginator;
