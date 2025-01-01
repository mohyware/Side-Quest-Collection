 internal class Program
{
     static void Main(string[] args)
    {
        Console.Write("please enter your Integer number(n):  ");
         long number=long.Parse(Console.ReadLine());
         long result = (number*(number + 1))/2;
         Console.WriteLine($"the result is: {result}");

         Console.ReadKey();
    }
}