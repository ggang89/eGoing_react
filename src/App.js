import { useState } from "react";

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            //event 객체를 첫번째 파라미터로 호출해준다
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            // 파라미터가 1개일때는 괄호 생략가능
            // id={t.id}가 onChangeMode가 필요한 id를 넣어주는 것
            event.preventDefault();
            props.onChangeMode(event.target.id);
            //함수안에서 a 태그의 id를 받음
            //event.target =>event를 유발시킨 것(여기서는 a태그)
          }}
        >
          {t.title}
        </a>
      </li>
    );
    //a태그도 동적으로 바껴야 하기때문에 {중괄호} 사용
  }

  return (
    <nav>
      <ol></ol>
    </nav>
  );
}
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const topics = [
    { id: 1, title: "html", body: "html is..." },
    { id: 2, title: "css", body: "css is..." },
    { id: 3, title: "javascript", body: "javascript is..." },
  ];
  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello,web"></Article>;
  } else if (mode === "READ") {
    content = <Article title="READ" body="Hello,READ"></Article>;
  }
  return (
    <div>
      <Header
        title="REACT"
        onChangeMode={() => {
          //onChangeMode라는 props을 갖는다
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          //여기서 받아오는 id값은 마음대로 정해도 되는가???
          setMode("READ");
          setId(_id);
        }}
      ></Nav>
      {/* "문자열 그대로 전달" {변수 전달} */}
      <Article title="Welcome" body="Hello,WeB"></Article>
      <Article title="HI" body="REACT"></Article>
    </div>
  );
}

export default App;
