import { useEffect } from 'react';

function EventListener() {
  const handleParentClick = (e) => {
    console.log('handleParentClick click', e);
  };
  const handleClick = (e) => {
    debugger;
    console.log(
      'child click',
      e,
      e.stopPropagation === e.nativeEvent.stopPropagation
    );
    // 调用原生事件对象上的，无法阻止事件传播，
    // 讲道理应该能拦截啊，为什么拦截不住呢？
    // 这是因为当 react 事件触发时，已经是原生事件冒泡到 #root，再触发 react 事件
    // 在 react 事件中拦截，属于是已经迟了一步了
    // 所以如果真要拦截 react 事件
    // 1. 要么使用 react 提供的  e.stopPropagation(); 而不是 e.nativeEvent.stopPropagation();
    // 要么像下面的代码，通过 addEventListener 添加原生事件，在原生事件中进行拦截。
    // e.nativeEvent.stopPropagation();
    // 这是 react 自己实现的 stopPropagation
    // e.stopPropagation();
  };
  useEffect(() => {
    function click1(e: Event) {
      console.log('原生 parent 事件触发');
      // e.stopPropagation();
    }

    function click2(e: Event) {
      console.log('原生 son 事件触发');
      // e.stopPropagation();
    }
    document.querySelector('#abc')!.addEventListener('click', click1);

    document.querySelector('#def')!.addEventListener('click', click2);

    return () => {
      document.querySelector('#abc')!.removeEventListener('click', click1);
      document.querySelector('#def')!.removeEventListener('click', click2);
    };
  }, []);

  return (
      <div className="card" onClick={handleParentClick} id="abc">
        <button onClick={handleClick} id="def">
          count is
        </button>
      </div>
  );
}

export default EventListener;
