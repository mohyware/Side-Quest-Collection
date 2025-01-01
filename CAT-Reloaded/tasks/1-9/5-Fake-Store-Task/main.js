const getData = async (url) => {
    const response = await fetch(url)
    const json = await response.json()

    return json
}

try {
    const product1 = await getData(`https://fakestoreapi.com/products/1`)
    const product4 = await getData(`https://fakestoreapi.com/products/4`)
    const product3 = await getData(`https://fakestoreapi.com/products/3`)
    const totalPrice = (product1.price * 3) + (product4.price * 4) + (product3.price * 5)
    console.log(totalPrice)
} catch (error) {
    console.log(error.message)
}

