

export const nameConcat = (nameArray) => nameArray.reduce((result, name, index, list) => {
		const div = index < list.length - 1 ? ',' : 'and';
		return index
			? `${result} ${div} ${name}`
			: name
		;
	}, '')
;

