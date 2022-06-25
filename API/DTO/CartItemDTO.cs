namespace API.DTO
{
    public class CartItemDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public long Price { get; set; }
        public int quantity { get; set; }
    }
}