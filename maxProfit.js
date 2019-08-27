let arr = [128, 97, 121, 123, 98, 97, 105];


function maxProf(arr) {

  let maxProfit = arr[0] - arr[1];

  for(let i = 1; i<arr.length-2; i++) {

    if(arr[i]-arr[i+1]>maxProfit) {
      maxProfit= arr[i]-arr[i+1];
      return maxProfit
    }


  } return maxProfit;

}

console.log(maxProf(arr))