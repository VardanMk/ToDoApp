﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ToDoApp.Data.Models;

public partial class ToDoItem
{
    [JsonPropertyName("id")]
    public int ToDoItemID { get; set; }
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("description")]
    public string Description { get; set; }
    [JsonPropertyName("status")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public ToDoItemStatus Status { get; set; }
    [JsonPropertyName("dueDate")]
    public DateOnly? DueDate { get; set; }

    public DateTime CreatedDateTime { get; set; }

    public DateTime LastModifiedDateTime { get; set; }
}

public enum ToDoItemStatus
{
    Pending = 1,
    Completed = 2,
    PastDue = 3,
}