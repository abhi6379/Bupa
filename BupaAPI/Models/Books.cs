namespace BookAPI.Models
{
    public class Book
    {
        public string Name { get; set; }
        public string Type { get; set; }
    }
    public class BookOwner
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public List<Book> Books { get; set; }
    }
}
