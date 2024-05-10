import React from 'react';
import DraggableComponent from './DraggableComponent.jsx';
import DroppableComponent from './DroppableComponent.jsx';

export default class App extends React.Component {

  handleDragEnd=(x, y)=> {
    console.log(x, y);
  }

  render() {
    return (
      <>

          <DraggableComponent onDragEnd={this.handleDragEnd}>
            {(isDragging, position) => {
              console.log(position);
              return isDragging ? "YES" : "NO"
            }}
          </DraggableComponent>
          <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt aspernatur dolorum beatae, fugiat tempora reprehenderit a sequi? Voluptatem iste consequuntur, ipsum incidunt earum natus sint ad porro neque amet beatae?
          Harum eligendi suscipit illum quaerat cum facere quisquam commodi sunt ipsum sapiente consequatur atque, deserunt excepturi eaque at qui id molestiae eveniet? Nam veritatis nulla nostrum ipsa voluptatibus praesentium nihil!
          Saepe a maxime, libero voluptate dolorum veritatis, voluptas quisquam illum animi itaque fugiat quis cupiditate dolores molestias, ipsum similique magnam ratione suscipit modi? Numquam impedit, distinctio magnam tenetur dignissimos maxime?
          Ullam eos aut ex? Corrupti, voluptatem libero ea eum ipsum at ratione similique recusandae tempore numquam doloremque earum id eveniet dolorum obcaecati ut neque voluptas perspiciatis! Fugit hic illum officiis?
          Eius dolore quae, ipsa cupiditate ea reiciendis aut nesciunt ullam dolorum deserunt debitis. Tempore explicabo voluptatum ducimus culpa perferendis velit distinctio, a, doloribus praesentium facere atque obcaecati inventore voluptates vitae?
          Similique, reprehenderit accusamus eaque nihil suscipit laudantium saepe illo totam ratione et! Ipsum earum praesentium architecto eveniet ea quia eaque. Animi error ipsum minima quod sint harum est laudantium earum.
          Accusamus deleniti earum similique repellat. Reiciendis obcaecati voluptatibus dolor, neque incidunt molestias est dolore commodi corrupti ad, atque tempore perspiciatis nulla illo praesentium ratione a doloremque dicta! In, cum reprehenderit!
          Itaque, fugit exercitationem! Aspernatur odit delectus ab obcaecati et qui reiciendis alias ducimus deleniti recusandae nulla eligendi quod, eveniet facere. Reiciendis tempore ut eum ipsum, ullam commodi sapiente earum veritatis!
          Temporibus, quasi tempore ratione molestiae odit facilis minus eveniet exercitationem dolorum, necessitatibus repellat nihil magnam. Ipsam obcaecati, ab labore ea nostrum consectetur fuga officiis. Autem sint aliquid illum et dolores?
          strum a dolor. Quas, incidunt tenetur nam assumenda et nostrum quasi doloribus possimus.</div>
          <DroppableComponent>Droppable</DroppableComponent>
      </>
      
    );
  }
}
