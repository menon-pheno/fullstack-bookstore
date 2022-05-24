async function dataFetcher(...args) {
  const response = await fetch(...args);
  return response.json();
}

export default dataFetcher;
