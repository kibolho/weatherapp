export interface ArrayGroupBy<T> {
	title: keyof T;
	data: T[];
}

/**
 * Group an array using a specific key.
 * Use this for SectionLists
 * Example: group operations by date
 */
export function arrayGroupBy<T = any>(
	objectArray: T[],
	key: keyof T,
): ArrayGroupBy<T>[] {
	return objectArray.reduce((groupedArray: any, currentObject: any) => {
		const title = currentObject[key] ?? '';
		const index = groupedArray.findIndex((item: any) => item.title === title);

		if (index !== -1) {
			groupedArray[index].data.push(currentObject);
		} else {
			groupedArray.push({ title, data: [currentObject] });
		}

		return groupedArray;
	}, []);
}

export function itemOfArrayByIndex<T>(array?: T[], index = 0): T | undefined {
	if (array && array.length > index) {
		return array[index];
	}
	return undefined;
}

/**
 * Filters array items according to the given key and returns only items matched with search
 */
export function filterArray<T = any>(
	items: T[],
	key: keyof T,
	search: string,
): T[] {
	return items.filter((item) => {
		const textLower = String(item[key]).toLowerCase();
		return textLower.includes(search.toLowerCase());
	});
}

export function getValueOfObjectKey<T>(
	obj: Record<string, T>,
	key: string,
): T | undefined {
	if (key in obj) return obj[key];
	return undefined;
}

export function sortByKeyAlphabetically<ItemType = any>(
	items: ItemType[],
	key: keyof ItemType,
): ItemType[] {
	return items.sort((itemA, itemB) => {
		const valueA = itemA[key] as unknown as string;
		const valueB = itemB[key] as unknown as string;

		if (valueA === '') return 1;
		if (valueB === '') return -1;

		return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
	});
}

/**
 * Returns an object with only the keysToKeep
 */
export function getRelevantObjectKeys<T = any>(
	obj: T,
	keysToKeep: (keyof T)[],
): Partial<T> {
	const newObject = {};

	for (const key of keysToKeep) {
		if (key in obj) {
			Object.assign(newObject, { [key]: obj[key] });
		}
	}

	return newObject;
}
export const isObject = (object: any): boolean => {
	return typeof object === 'object' && object !== null;
};
export const isEmptyObject = (object: any): boolean => {
	return Object.keys(object).length === 0 && object.constructor === Object;
};
export const isEmpty = (object: any): boolean => {
	if (
		object === null ||
		object === undefined ||
		object === '' ||
		isEmptyObject(object)
	)
		return true;
	return false;
};
export function removeEmptyKeysFromObject(object: any): any {
	Object.keys(object).forEach((key) => {
		if (isObject(object[key]))
			object[key] = removeEmptyKeysFromObject(object[key]);
		if (isEmpty(object[key])) delete object[key];
	});
	return object;
}
