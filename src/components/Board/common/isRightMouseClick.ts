export const isRightMouseClick = (
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
) => {
  if ('which' in e)
    // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
    return e.which == 3;
  else if ('button' in e)
    // IE, Opera
    return e.button == 2;
  return false;
};
