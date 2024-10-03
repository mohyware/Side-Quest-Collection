#include <iostream>
using namespace std;
int main()
{
    int n;

    cout << "Enter a positive integer : ";
    cin >> n;

    if (n <= 0)
    {
        cerr << "Please enter a positive integer." << endl;
        return 1;
    }

    int sum = 0;
    for (int i = 1; i <= n; ++i)
    {
        sum += i;
    }

    cout << "The sum of positive integers up to " << n << " is: " << sum << endl;

    return 0;
}