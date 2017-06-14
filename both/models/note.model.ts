//a Common note interface.
export interface Note {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  owner: string;
  public: boolean;
}
