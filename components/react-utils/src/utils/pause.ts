const pause = (sec: number) =>
  new Promise((res: any) => {
    setTimeout(res, sec * 1000);
  });

export default pause;
