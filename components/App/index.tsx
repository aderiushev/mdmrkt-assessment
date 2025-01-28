import {StyledApp} from "@/components/App/styles";

type AppProps = {
  children: React.ReactNode;
};

const App = (props: AppProps) => {
  return (
    <StyledApp>
      {props.children}
    </StyledApp>
  );
};

export default App;
