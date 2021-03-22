namespace TKSolution.Core.Model
{
    public class ResponseResult
    {
        public bool success { get; set; }
        public string errorMessage { get; set; }
        public object data { get; set; }
    }

    public class ResponseResultPage
    {
        public int count { get; set; }
        public object items { get; set; }
    }
}
