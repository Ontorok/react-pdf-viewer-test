import React from "react";

const TestSelectComponent = () => {
  return (
    <div
      onMouseUp={(e) => {
        e.preventDefault();
        const selection = window.getSelection()?.toString();
        console.log(selection);
        alert("Hello");
      }}
    >
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta aut laudantium repellat et quam doloremque recusandae, quidem cum. Rem, ipsum
      assumenda laudantium illo nesciunt quo est voluptas reiciendis sapiente voluptatum voluptates non quibusdam quasi eligendi impedit fugiat quis
      velit omnis eos tempora. Nulla ipsa quia eaque atque eligendi unde sunt excepturi. Natus, vitae. Ea consectetur facilis, minus, placeat esse
      sint animi laborum numquam dignissimos natus obcaecati porro repudiandae veritatis itaque! Repudiandae labore consequatur voluptatem quod quia
      beatae ipsam possimus eligendi soluta. Aspernatur, odit nam cumque vitae, magnam praesentium tempore, accusantium dolorum harum sunt ullam sit
      modi architecto impedit nisi facilis incidunt repudiandae accusamus perferendis temporibus saepe! Aut blanditiis illum doloremque quam ipsa iure
      tempora quod tempore laudantium ut recusandae repellendus, earum beatae, velit ab aliquid quidem nulla nesciunt dolore id sed! Accusamus, esse
      ab reprehenderit, quibusdam quas maiores error qui cum aut eos vitae velit quis deserunt itaque commodi architecto adipisci. Unde reiciendis
      dicta, eveniet qui, cum totam nulla, officia magni obcaecati iusto ratione voluptate rerum tenetur! Dolore maxime, atque accusantium id velit
      necessitatibus ipsa explicabo, eum iusto quae voluptatem laborum, soluta molestias. Perferendis, vitae necessitatibus qui at labore dolorum
      repudiandae debitis facilis recusandae illum magnam velit ullam vero? Culpa officia velit dolor voluptatum vero cumque deserunt distinctio id
      in, magnam obcaecati minima voluptatem? Sapiente, a nulla debitis rem commodi voluptatem nostrum labore, repellat molestias autem, deserunt
      dolorem consequuntur totam similique aspernatur sed ratione tempora eaque atque optio? Incidunt ipsa laudantium fuga placeat. Facere voluptas
      magni officia delectus inventore excepturi distinctio incidunt praesentium, odio quae veritatis necessitatibus fugiat, repellendus deleniti
      corporis consequuntur alias dolorum sint dignissimos officiis reiciendis. Provident eveniet, similique qui atque animi ut beatae, asperiores
      ratione ullam, illo rerum at? Asperiores nam totam aperiam quisquam iusto repellendus nihil omnis officia perferendis nemo quis laborum nisi
      possimus reprehenderit eum veritatis consequuntur eligendi quos numquam explicabo facere iste magnam, quas eveniet. Accusamus animi iusto
      blanditiis quo saepe eum libero harum assumenda nihil, odio sapiente porro accusantium iste! Cumque, quaerat ratione nesciunt illo delectus, ut
      sed accusamus consectetur unde consequuntur provident mollitia vel eveniet iure? Laudantium velit minus expedita quasi totam deserunt quis esse
      impedit est similique atque aperiam culpa, quisquam ducimus! Cumque et placeat non veniam aliquam illo? Neque, qui deleniti nisi voluptatem quis
      tenetur nesciunt maiores. Hic fugiat, provident perspiciatis laborum, repellendus nobis accusamus magni eum a rem animi quis modi? Sunt quis
      libero error. Laborum excepturi eveniet nesciunt atque ex aspernatur quo aperiam dolor dignissimos neque suscipit tenetur praesentium molestiae,
      dolore dolorum nulla voluptates tempore illum commodi eius id. Tempore quam possimus ducimus sint laborum consequatur fugit iure nisi earum
      corrupti culpa magnam laboriosam non alias, ut, quidem rem. Odio sint tempora id accusamus aliquam libero adipisci similique corporis.
      Reiciendis voluptates ducimus soluta mollitia ullam neque, voluptatibus quidem cupiditate deserunt minima dolore possimus aspernatur rem, odio
      accusamus voluptas minus aperiam suscipit itaque modi voluptate temporibus. Ipsam voluptatibus inventore ad eius in veritatis asperiores dolorum
      nesciunt porro sint alias deleniti dolore sequi, voluptatum beatae dolores molestias officia numquam unde!
    </div>
  );
};

export default TestSelectComponent;
