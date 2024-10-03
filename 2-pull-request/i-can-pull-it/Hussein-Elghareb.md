#include <bits/stdc++.h>
using namespace std;
typedef long double ld;
#define int long long

void fast()
{
    cin.tie(0);
    cin.sync_with_stdio(0);
}

signed main()
{
    fast();
    int n;
    cin >> n;
    cout << (n * (n + 1)) / 2;
}
