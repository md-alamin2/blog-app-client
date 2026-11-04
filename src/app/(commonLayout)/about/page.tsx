export default async function AboutPage() {
  //* for simulate loading time
  // await new Promise((resolve) => setTimeout(resolve, 4000));

  //* for simulate error
  // throw new Error("something went wrong")
  return (
    <div>
      <h1>This is about page Component</h1>
    </div>
  );
}
