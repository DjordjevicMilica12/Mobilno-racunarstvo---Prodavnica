﻿namespace Prodavnica_backend.DTOs.Proizvod
{
    public class ProizvodDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; } 
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string Pol { get; set; } = string.Empty;
    }
}
