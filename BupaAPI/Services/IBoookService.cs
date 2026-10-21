using BookAPI.Models;

namespace BupaAPI.Services
{
    public interface IBoookService
    {
        public Task<List<BookOwner>> GetBookOwners();
    }
}
