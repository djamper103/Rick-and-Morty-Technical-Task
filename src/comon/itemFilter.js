export default function ItemFilter(state,item) {

    const{species,status,gender,name,type}={...item}

    if(state){
        const newProducts = [...state]
        .filter((product) =>
            species? species === "All" ? product : product.species === species : product
        )
        .filter((product) =>
            status? status === "All" ? product : product.status === status : product
        )
        .filter((product) =>
            gender? gender === "All" ? product : product.gender === gender : product
        )
        .filter((product) =>
            name? name === "All" ? product : product.name === name : product
        )
        .filter((product) =>
            type? type === "All" ? product : product.type === type : product
        );
    return newProducts
    }
}