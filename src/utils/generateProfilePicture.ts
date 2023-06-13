export class GenerateProfilePicture {
  public static getRandomColor(): string {
    let letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  public static getInitials(name: string): string {
    let initials;
    const nameSplit = name.split(" ");
    const nameLength = nameSplit.length;

    if (nameLength > 1) {
      initials =
        nameSplit[0].substring(0, 1) +
        nameSplit[nameLength - 1].substring(0, 1);
    } else {
      initials = nameSplit[0].substring(0, 1);
    }

    return initials.toUpperCase();
  }

  public static createImageFromInitials(
    size: number,
    name: string,
    color: string
  ): string | null {
    if (!name) return null;
    name = GenerateProfilePicture.getInitials(name);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    canvas.width = canvas.height = size;

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, size, size);

    context.fillStyle = `${color}50`;
    context.fillRect(0, 0, size, size);

    context.fillStyle = color;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = `${size / 2}px Roboto`;
    context.fillText(name, size / 2, size / 2);

    return canvas.toDataURL("image/jpeg", 1);
  }
}
