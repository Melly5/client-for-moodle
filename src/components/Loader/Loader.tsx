import ContentLoader from "react-content-loader";

const CourseItemLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={350}
    height={58}
    viewBox="0 0 450 50"
    backgroundColor="#f7f7f7"
    foregroundColor="#dcdbdb"
    {...props}
  >
    <rect x="7" y="3" rx="12" ry="12" width="35" height="35" />
    <rect x="60" y="8" rx="10" ry="10" width="260" height="23" />
  </ContentLoader>
);

export default CourseItemLoader;
