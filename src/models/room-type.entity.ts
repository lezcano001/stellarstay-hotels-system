export class RoomType {
  constructor(
    public readonly id: string,
    public name: string,
    public baseRate: number,
    public description: string
  ) {}
}