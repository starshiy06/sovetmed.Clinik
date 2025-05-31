
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <style>
    .tooltip {
      position: relative;
      display: inline-block;
      cursor: pointer;
      color: blue;
      text-decoration: underline;
    }

    .tooltip-text {
      visibility: hidden;
      width: 140px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 5px;
      padding: 5px 8px;
      position: absolute;
      z-index: 1;
      bottom: 125%; /* Позиция тултипа сверху */
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none; /* Чтобы тултип не мешал наведению */
    }

    .tooltip:hover .tooltip-text {
      visibility: visible;
      opacity: 1;
    }

    /* Треугольник под тултипом */
    .tooltip-text::after {
      content: "";
      position: absolute;
      top: 100%; /* Внизу тултипа */
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: black transparent transparent transparent;
    }
  </style>
</head>
<body>

  <span class="tooltip">
    Адрес
    <span class="tooltip-text">Это всплывающий текст</span>
  </span>

</body>
</html>
