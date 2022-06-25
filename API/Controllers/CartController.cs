using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly StoreContext _context;

        public CartController(StoreContext context) 
        {
            _context = context;
        }

        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDTO>> GetCart()
        {
            var cart = await RetrieveCart();

            if (cart == null) return NotFound();

            return MapCartToDTO(cart);
        }

        [HttpPost]
        public async Task<ActionResult<CartDTO>> AddItemToCart(int productId, int quantity)  
        {
            var cart = await RetrieveCart();
            if (cart == null) {
                cart = CreateCart();
            }
            var prod = await _context.Products.FindAsync(productId);
            if (prod == null) {
                return NotFound();
            }
            cart.AddItem(prod, quantity);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetCart", MapCartToDTO(cart));

            return BadRequest(new ProblemDetails{Title = "Prroblem saving item to cart"});
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
        {
            var cart = await RetrieveCart();
            
            if (cart == null) return NotFound();

            cart.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            
            if (result) return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem removing item from the basket"});
        }

        
        
        // Internal Methods
        private async Task<Cart> RetrieveCart()
        {
            return await _context.Carts
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Cart CreateCart()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var cart = new Cart{BuyerId = buyerId};
            _context.Carts.Add(cart);
            return cart;
        }

        private CartDTO MapCartToDTO (Cart cart)
        {
            return new CartDTO
            {
                Id = cart.Id,
                BuyerId = cart.BuyerId,
                Items = cart.Items.Select(item => new CartItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    quantity = item.Quantity,
                }).ToList()
            };
        }
    }
}