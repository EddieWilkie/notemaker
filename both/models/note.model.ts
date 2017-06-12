//a Common note interface.
export interface Note {
  title: string;
  description: string;
  createdAt: Date;
  owner: string;
  public: boolean;
}
