

describe('Example Component', () => {
  
  test('Debe de ser mayor a 10', () => { 
      
      let value = 5;

      value += 6;

      // if(value > 10) {

      // }else{
      //   throw `${value} no es mayor a 10`
      // }

      expect(value).toBeGreaterThan(10);

  })

})