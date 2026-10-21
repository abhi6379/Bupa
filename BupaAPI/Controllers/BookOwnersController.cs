using BookAPI.Models;
using BupaAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class BookOwnersController : ControllerBase
    {
        IBoookService _bookService;

        public BookOwnersController(IBoookService bookService)
        {
            _bookService = bookService;
        }
        [HttpGet]
        public async Task<IActionResult> GetBookOwnersAsync()
        {
            var owners = await _bookService.GetBookOwners();
            return Ok(owners);
        }
    }
}
