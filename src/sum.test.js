import sum from "./sum"

it("When a and b is a number", ()=>{
    const result = sum (1,2);

    //result === 3
    expect(result).toBe(3);
});

it("When a and b is string",()=>{

    const result = sum ("1","2");

    expect(result).toBe(3);
})
